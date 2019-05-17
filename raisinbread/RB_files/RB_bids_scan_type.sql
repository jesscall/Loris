SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE `bids_scan_type`;
LOCK TABLES `bids_scan_type` WRITE;
INSERT INTO `bids_scan_type` (`BIDSScanTypeID`, `BIDSScanType`) VALUES (1,'bold');
INSERT INTO `bids_scan_type` (`BIDSScanTypeID`, `BIDSScanType`) VALUES (5,'dwi');
INSERT INTO `bids_scan_type` (`BIDSScanTypeID`, `BIDSScanType`) VALUES (2,'FLAIR');
INSERT INTO `bids_scan_type` (`BIDSScanTypeID`, `BIDSScanType`) VALUES (3,'T1w');
INSERT INTO `bids_scan_type` (`BIDSScanTypeID`, `BIDSScanType`) VALUES (4,'T2w');
UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS=1;