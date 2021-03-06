<?php
/**
 * For gwas_browser class file, a subtab in the Genomic Browser
 * Displays GWAS analysis results
 * Filterable by SNP and p-value, and other fields.
 *
 * PHP version 7
 *
 *  @category LORIS_Module
 *  @package  Genomics
 *  @author   Christine Rogers <rogers@bic.mni.mcgill.ca>
 *  @license  http://www.gnu.org/licenses/gpl-3.0.txt @GPLv3
 *  @link     https://www.github.com/aces/Loris/
 */
namespace LORIS\genomic_browser;

/**
 * GWAS_Browser Class
 *
 * This class is gwas_browser Form
 * GWAS submenu tab for Genomic Browser
 *
 * @category LORIS_Module
 * @package  Genomics
 * @author   Christine Rogers <rogers@bic.mni.mcgill.ca>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt @GPLv3
 * @link     https://github.com/aces/Loris
*/
class GWAS_Browser extends \NDB_Menu_Filter
{
    /**
     * Variables to enable special filter behaviour -
     * Show brief results or show full results (all available fields)
     */
    var $_displayBrief = true;  // default: display only Brief results

    /**
     * Overloading this method to allow access to site users (own site only)
     * and users w/ multisite privileges
     *
     * @note   overloaded function
     * @return bool
     */
    function _hasAccess()
    {
        // create user object
        $user = \User::singleton();
        return ($user->hasPermission('genomic_browser_view_allsites')
                || $user->hasPermission('genomic_browser_view_site'));
    }

    /**
     * Function _setupVariables
     *
     * @note   overloaded function
     * @return bool
    */
    function _setupVariables()
    {
        // set the class variables
        $this->columns = array(
                          'GWAS.rsID AS SNP_ID',
                          'genome_loc.Chromosome AS Chromosome',
                          'genome_loc.StartLoc AS Position_BP',
                          'GWAS.MajorAllele AS Major_Allele',
                          'GWAS.MinorAllele AS Minor_Allele',
                          'GWAS.MAF AS MAF',
                          'GWAS.Estimate AS Estimate',
                          'GWAS.StdErr AS StdErr',
                          'GWAS.Pvalue AS Pvalue',
                         );

        // This variable will be used by the columnFormatter javascript
        // to set the default hidden columns in the data table.
        $this->tpl_data['hiddenHeaders'] = json_encode(
            array_map(
                function ($header) {
                        return ucwords(str_replace('_', ' ', $header));
                },
                array()
            )
        );

        // $this->query = " FROM GWAS ";
        $this->query = " FROM GWAS
            JOIN SNP ON (GWAS.SNPID = SNP.SNPID)
            JOIN genome_loc ON (genome_loc.GenomeLocID = SNP.GenomeLocID)";

        $this->order_by     = 'genome_loc.Chromosome, GWAS.Pvalue DESC';
        $this->validFilters = array(
                               'GWAS.rsID',
                               'genome_loc.Chromosome',
                               'genome_loc.StartLoc',
                               'GWAS.MajorAllele',
                               'GWAS.MinorAllele',
                               'GWAS.MAF',
                               'GWAS.Estimate',
                               'GWAS.StdErr',
                               'GWAS.Pvalue',
                              );

        $this->formToFilter = array(
                               'SNP_ID'       => 'GWAS.rsID',
                               'Chromosome'   => 'genome_loc.Chromosome',
                               'BP_Position'  => 'genome_loc.StartLoc',
                               'Major_Allele' => 'GWAS.MajorAllele',
                               'Minor_Allele' => 'GWAS.MinorAllele',
                               'MAF'          => 'GWAS.MAF',
                               'Estimate'     => 'GWAS.Estimate',
                               'StdErr'       => 'GWAS.StdErr',
                               'Pvalue'       => 'GWAS.Pvalue',
                              );

        return true;
    }

    /**
     * Does the setup required for this page. By default, sets up elements
     * that are common to every type of page. May be overridden by a specific
     * page or specific page type.
     *
     * @param string $name       The test name being accessed
     * @param string $page       The subtest being accessed (may be null)
     * @param string $identifier The identifier for the data to load on this page
     * @param string $commentID  The CommentID to load the data for
     * @param string $formname   The name to give this form
     *
     * @return none
     */
    function _setupPage($name, $page, $identifier, $commentID, $formname)
    {
        parent::_setupPage($name, $page, $identifier, $commentID, $formname);

        // create user object
        $user = \User::singleton();

        // add form elements
        $show_results_options = array(
                                 'brief' => 'Summary fields',
                                 'full'  => 'All fields',
                                );
        $this->addSelect('Show_Brief_Results', 'Display:', $show_results_options);

        $this->addBasicText('SNP_ID', 'SNP ID:');
        $this->addBasicText('Chromosome', 'Chromosome:');
        $this->addBasicText('BP_Position', 'BP Position:');
        $this->addBasicText('MAF', 'MAF:');

        $alleleArray = array(
                        ''  => 'Any',
                        'A' => 'A',
                        'C' => 'C',
                        'T' => 'T',
                        'G' => 'G',
                       );
        $this->addSelect('Minor_Allele', 'Minor Allele:', $alleleArray);
        $this->addSelect('Major_Allele', 'Major Allele:', $alleleArray);

        $this->addBasicText('Estimate', 'Estimate:');
        $this->addBasicText('StdErr', 'Std Err:');
        $this->addBasicText('Pvalue', 'P-value:');

        return true;
    }

    /**
     * Adds filters
     * This function overrides filters to enable display of brief/full results
     *
     * @param string $prepared_key filter key
     * @param string $field        filter field
     * @param string $val          filter value
     *
     * @note overloaded function
     *
     * @return $query
    */
    function _addValidFilters($prepared_key, $field, $val)
    {
        $query = ''; //initialize
        if ($field == "show_brief_results") {
            if ($val == "full") {
                $this->_displayBrief = false;
            }
            return $query;
        }

        if ((!empty($val) || $val === '0') && $field != 'order') {
            if (in_array($field, $this->CheckboxFilters) && $val) {
                 $query .= " AND $field";
            } elseif (strtolower(substr($field, -8)) == 'centerid'
                || strtolower(substr($field, -10)) == 'categoryid'
                || strtolower(substr($field, -6)) == 'gender'
                || strtolower(substr($field, -10)) == 'chromosome'
                || (isset($this->EqualityFilters)
                && in_array($field, $this->EqualityFilters))
            ) {

                 $query .= " AND $field = :v_$prepared_key";
            } else {
                 $query .= " AND $field LIKE CONCAT('%', :v_$prepared_key, '%') ";
            }
        }
        return $query;
    }

    /**
     * Include the column formatter required to display the feedback link colours
     * in the candidate_list menu
     *
     * @return array of javascript to be inserted
     */
    function getJSDependencies()
    {
        $factory = \NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();
        $deps    = parent::getJSDependencies();
        return array_merge(
            $deps,
            array(
             $baseURL . "/genomic_browser/js/genomic_browser.js",
             $baseURL . "/genomic_browser/js/gwasColumnFormatter.js",
            )
        );
    }

}
?>
