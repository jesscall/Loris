<?php
/**
 * This class provides a single point to deal with user authentication
 * and validation of login, displaying the login page if necessary.
 *
 * PHP Version 5
 *
 * @category Main
 * @package  Main
 * @author   Loris Team <loris.mni@bic.mni.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */

/**
 * SinglePointLogin class
 *
 * This class provides a single-point user login to the NeuroDB GUIs
 * Its public functions can be used to display a login window at the
 * current location while preserving the current state of the GUI.
 *
 * @category Main
 * @package  Main
 * @author   Loris Team <loris.mni@bic.mni.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class SinglePointLogin
{
    /**
     * Defines whether a user is currently logged in
     */
    var $_isLoggedIn = false;

    /**
     * Internally held copy of username
     */
    var $_username = null;

    /**
     * To carry the error messages
     */
    var $_lastError = null;

    /**
     * Defines whether a user's password has expired
     */
    var $_passwordExpired = false;

    /**
     * Dumps the login form
     *
     * @return void
     * @access public
     */
    function showLoginScreen()
    {
        $tpl_data = array();
        if (isset($_POST['username'])) {
            $tpl_data['username'] = $_POST['username'];
        } else {
            $tpl_data['username'] = '';
        }

        $tpl_data['currentyear'] = date('Y');
        $tpl_data['version']     = file_get_contents(__DIR__ . "/../../VERSION");

        // remove logout from request
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $params);
            unset($params['logout']);
        } else {
            $params = array();
        }

        $config =& NDB_Config::singleton();

        $tpl_data['page_title']    = $config->getSetting('title');
        $tpl_data['css']           = $config->getSetting('css');
        $tpl_data['action']        = $_SERVER['PHP_SELF']
            . '?' . http_build_query($params);
        $tpl_data['error_message'] = $this->_lastError;

        $study_links = $config->getExternalLinks('Studylinks');
        foreach ($study_links as $label => $url) {
            $WindowName = md5($url);
            $tpl_data['studylinks'][] = array(
                                         'url'        => $url,
                                         'label'      => $label,
                                         'windowName' => $WindowName,
                                        );
        }

        $study_title       = $config->getSetting('title');
        $study_description = $config->getSetting('StudyDescription');
        $tpl_data['study_title']       = $study_title;
        $tpl_data['study_description'] = html_entity_decode($study_description);
        try {
            $tpl_data['study_logo'] = $config->getSetting('studylogo');
        } catch(ConfigurationException $e) {
            $tpl_data['study_logo'] = '';
        }

        $www = $config->getSetting('www');
        $tpl_data['baseurl'] = $www['url'];
        $tpl_data['page']    = 'login';

        //Output template using Smarty
        $smarty = new Smarty_neurodb;
        $smarty->assign($tpl_data);
        $smarty->display('public_layout.tpl');
    }


    /**
     * Dumps the password expiry form
     *
     * @return void
     * @access public
     */
    function showPasswordExpiryScreen()
    {
        // Set passwordExpired flag
        $this->_passwordExpired = true;

        $tpl_data['username'] = $_POST['username'];

        // remove logout from request
        parse_str($_SERVER['QUERY_STRING'], $params);
        unset($params['logout']);

        $config =& NDB_Config::singleton();

        $tpl_data['page_title'] = $config->getSetting('title');
        $tpl_data['css']        = $config->getSetting('css');
        $study_title            = $config->getSetting('title');
        $study_description      = $config->getSetting('StudyDescription');
        try {
            $study_logo = $config->getSetting('studylogo');
        } catch(ConfigurationException $e) {
            $study_logo = '';
        }

        $tpl_data['study_title']       = $study_title;
        $tpl_data['study_description'] = $study_description;
        $tpl_data['study_logo']        = $study_logo;
        $tpl_data['page'] = 'password-expiry';

        $tpl_data['action'] = $_SERVER['PHP_SELF']
            .'?'
            . http_build_query($params);

        $tpl_data['error_message'] = $this->_lastError;

        //Output template using Smarty
        $smarty = new Smarty_neurodb;
        $smarty->assign($tpl_data);
        $smarty->display('public_layout.tpl');
        return false;
    }


    /**
     * Checks whether anyone is currently logged in
     *
     * @return bool
     * @access public
     */
    function isLoggedIn()
    {
        return $this->_isLoggedIn;
    }

    /**
     * Checks whether users password is expired
     *
     * @return bool
     * @access public
     */
    function passwordExpired()
    {
        return $this->_passwordExpired;
    }


    /**
     * Saves the new password if last was expired
     *
     * @return void
     * @access public
     */
    function save()
    {
        // get saved data to pre-populate form
        $user =& User::factory($_POST['username']);

        // get user's data
        $data = $user->getData();

        // check password strength
        if (!User::isPasswordStrong(
            $_POST['password'],
            array(
             $_POST['confirm'],
             $data['UserID'],
             $data['Email'],
            ),
            array(
             '==',
             '!=',
             '!=',
            )
        )
        ) {
            $this->_lastError = 'The password is weak, or'
               . ' the passwords do not match';
        }

        if (password_verify($_POST['password'], $data['Password_hash'])) {
            $this->_lastError = 'You cannot keep the same password';
        }

        // if errors
        if (!empty($this->_lastError)) {
            return false;
        }

        // Reset passwordExpired flag
        $this->_passwordExpired = false;
        $user->updatePassword($_POST['password']);
        return true;
    }

    /**
     * Attempt to authenticate a user's credentials by any supported means.
     *
     * @return none, but may modified session state
     */
    function authenticate()
    {
        // Reset passwordExpired flag
        $this->_passwordExpired = false;

        if (!function_exists('getallheaders')) {
            /**
             * In case unable to detect getallheaders function
             *
             * @return array headers
             */
            function getallheaders()
            {
                $headers = '';
                foreach ($_SERVER as $name => $value) {
                    if (substr($name, 0, 5) == 'HTTP_') {
                        $headers[str_replace(
                            ' ',
                            '-',
                            ucwords(
                                strtolower(
                                    str_replace(
                                        '_',
                                        ' ',
                                        substr(
                                            $name,
                                            5
                                        )
                                    )
                                )
                            )
                        )] = $value;
                    }
                }
                return $headers;
            }
        }
        // First try JWT authentication, which is cheaper and
        // doesn't involve database calls
        $headers    = getallheaders();
        $authHeader = isset($headers['Authorization'])
                         ? $headers['Authorization']
                         : '';
        if (!empty($authHeader)) {
            $token = explode(" ", $authHeader);
            // Index 0 is "Bearer", 1 is the token
            if ($this->JWTAuthenticate($token[1]) === true) {
                return true;
            }

        }

        // Now try password validation

        // This wasn't a login form, so don't waste any time
        if (empty($_POST['login'])) {
            return false;
        }
        return $this->passwordAuthenticate($_POST['username'], $_POST['password']);
    }

    /**
     * Attempts to authenticate a JWT token
     *
     * @param string $token The token extracted from the
     *                      Authorization: Bearer header
     *
     * @return true if the session is valid, false otherwise
     */
    function JWTAuthenticate($token)
    {
        $factory = NDB_Factory::singleton();
        $config  = $factory->config();

        $sharedKey = $config->getSetting("JWTKey");

        //$jwt = \Firebase\JWT\JWT::encode($token, $sharedKey);
        try {
            $decoded = \Firebase\JWT\JWT::decode($token, $sharedKey, array("HS256"));
        } catch(Exception $e) {
            return false;
        }

        $decodedArray    = (array) $decoded;
        $this->_username
            = isset($decodedArray['user'])
                ? $decodedArray['user'] : 'Unknown';
        return isset($decodedArray['user']);
    }

    /**
     * Checks whether a given username and password are valid
     *
     * @param string $username The username to validate
     * @param string $password The username to validate
     * @param bool   $redirect If this flag is true, this
     *                         function may instead print
     *                         out a login or password expiry
     *                         page. when trying to authenticate.
     *                         If false, it won't provide any output
     *                         in those situation.
     *
     * @return bool true if the username and password are valid
     * @access public
     */
    function passwordAuthenticate($username, $password, $redirect = true)
    {
        $this->_lastError = '';

         ///////////////////////////
         ///initialization/////
         //////////////////////////
        $this->_username = isset($username) ? $username : 'Unknown';

        $setArray = array(
                     'userID'          => $this->_username,
                     'Success'         => 'Y',
                     'Failcode'        => null,
                     'Login_timestamp' => date('Y-m-d H:i:s'),
                     'IP_address'      => isset($_SERVER['REMOTE_ADDR'])
                                              ? $_SERVER['REMOTE_ADDR']
                                              : 'Unknown',
                     'Page_requested'  => isset($_SERVER['REQUEST_URI'])
                                              ? $_SERVER['REQUEST_URI']
                                              : 'Unknown',
                    );
        // save the new password if the last password expired
        if (isset($_POST['expiry'])) {
            $success = $this->save();

            if ($success == false) {
                if ($redirect) {
                    $this->showPasswordExpiryScreen();
                }
                return false;
            }
        }

        // don't waste execution time if no form was submitted

        if (empty($username)) {
            $this->_lastError = 'Please enter a username';
            $this->insertFailedDetail(
                $this->_lastError,
                $setArray
            );
            return false;
        }

        if (empty($password)) {
            $this->_lastError = 'Please enter a password';
            $this->insertFailedDetail(
                $this->_lastError,
                $setArray
            );
            return false;
        }

        // create DB object
        $factory = NDB_Factory::singleton();
        $DB      = $factory->database();

        // check users table to see if we have a valid user
        $query = "SELECT COUNT(*) AS User_count,
                        UserID,
                        Password_expiry,
                        Active,
                        Pending_approval,
                        Password_hash
                    FROM users
                  WHERE UserID = :username
                  GROUP BY UserID";
        $row   = $DB->pselectRow($query, array('username' => $username));

        if ($row['User_count'] == 1) {
            // validate passsword
            $oldhash = $row['Password_hash'];
            if (password_verify($password, $oldhash)) {
                if (password_needs_rehash($oldhash, PASSWORD_DEFAULT)) {
                    $user =& User::factory($username);
                    $user->updatePassword($password);
                }

                if ($row['Active'] == 'N'
                    || $this->disabledDueToInactivity($username, 365)
                ) {
                    $this->_lastError = "Your account has been deactivated."
                        . " Please contact your project administrator to"
                        . " reactivate this account.";
                    $this->insertFailedDetail(
                        "user account not active",
                        $setArray
                    );

                    return false;
                }

                if ($row['Pending_approval'] == 'Y') {
                    $this->_lastError = "Your account has not yet been activated."
                        . " Please contact your project administrator to activate"
                        . " this account.";
                    $this->insertFailedDetail("user account pending", $setArray);
                    return false;
                }

                // check if the password expired
                if (strcmp($row['Password_expiry'], date('Y-m-d', time())) < 1) {
                    // show password expiry screen
                    if ($redirect) {
                        $this->showPasswordExpiryScreen();
                    }
                    $this->_lastError = "Password expired";
                    return false;
                }

                // user is valid
                $this->_username = $row['UserID'];

                $result =  $DB->insert('user_login_history', $setArray);
                return true;
            }
        }

        // bad usename or password
        $this->_lastError = "Incorrect email or password";
        return false;
    }

    /**
     * Sets the session data (State object)
     *
     * @return void
     * @access public
     */
    function setState()
    {
        // someone is logged in
        $this->_isLoggedIn = true;

        // create the session managed State object
        if (!isset($_SESSION['State'])) {
            $_SESSION['State'] =& State::singleton();
        }

        $_SESSION['State']->setUsername($this->_username);
    }

    /**
     * Clears the authentication related session data (State object)
     *
     * @return void
     * @access public
     */
    function clearState()
    {
        // someone is logged in
        $this->_isLoggedIn = false;

        // create the session managed State object
        if (!isset($_SESSION['State'])) {
            $_SESSION['State'] =& State::singleton();
        }

        $_SESSION['State']->setUsername(null);
    }

     /**
     * Inserts the login (or failed-login) detail into the user_login_history
     *
     * @param String $description description for the failed-login
     * @param Array  $setArray    contains data to be inserted
     *
     * @return null
      */
    function insertFailedDetail($description, $setArray)
    {
        // create DB object
        $DB =& Database::singleton();

        $setArray['Success']     = 'N';
        $setArray['Fail_detail'] = $description;

        // in future, add mapping of error message to Failcode field enum
        $result =  $DB->insert('user_login_history', $setArray);
    }

    /**
     * Checks if a user has not logged in for a given amount of time
     * As a side-effect, if true, will also set user field 'active' to 'N'
     * Need to have already confirmed valid user
     *
     * @param String $username            username
     * @param Int    $maximumDaysInactive Most allowable days for inactivity
     *
     * @return bool - true if the user has now been disabled
     */
    function disabledDueToInactivity($username, $maximumDaysInactive)
    {
        $DB    =& Database::singleton();
        $query = "SELECT MAX(Login_timestamp) as Login_timestamp
                  FROM user_login_history 
                  WHERE UserID = :username";

        $row        = $DB->pselectRow($query, array('username' => $username));
        $last_login = new DateTime($row['Login_timestamp']);
        $time_now   = new DateTime("now");
        $interval   = $last_login->diff($time_now);

        if ($interval->days > $maximumDaysInactive) {
            $DB->update(
                'users',
                array('Active' => 'N'),
                array('UserID' => $username)
            );
            return true;
        }
        return false;
    }
}
?>
