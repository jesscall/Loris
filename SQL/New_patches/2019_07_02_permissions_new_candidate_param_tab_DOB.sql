INSERT IGNORE INTO permissions (code, description, categoryID) VALUES
    ("candidate_dob_edit","Edit dates of birth",2);

INSERT IGNORE INTO user_perm_rel VALUES
    (1,(SELECT permID FROM permissions WHERE code='candidate_dob_edit'));