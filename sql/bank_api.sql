-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               5.7.24 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5332
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for bankapi
CREATE DATABASE IF NOT EXISTS `bankapi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bankapi`;

-- Dumping structure for table bankapi.bank
CREATE TABLE IF NOT EXISTS `bank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `transfer_nonbank_cost` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.bank: ~0 rows (approximately)
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` (`id`, `name`, `description`, `transfer_nonbank_cost`, `created_at`, `updated_at`) VALUES
	(1, 'Bank Vince', 'Salah satu bank terbesar se asia tenggara', 3000, '2019-04-06 09:45:40', '2019-04-06 09:45:40'),
	(2, 'Bank Rakyat', 'Bank untuk rakyat menengah', 2500, '2019-04-06 11:49:47', '2019-04-06 11:49:47');
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;

-- Dumping structure for table bankapi.deposit
CREATE TABLE IF NOT EXISTS `deposit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dates` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `rekening_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.deposit: ~0 rows (approximately)
/*!40000 ALTER TABLE `deposit` DISABLE KEYS */;
INSERT INTO `deposit` (`id`, `dates`, `description`, `nominal`, `rekening_id`) VALUES
	(1, '2019-04-06', 'Input saldo', 120000, 1),
	(2, '2019-04-06', 'Input saldo', 50000, 2),
	(3, '2019-04-06', 'Menerima saldo dari rekening 7351528413', 25000, 1);
/*!40000 ALTER TABLE `deposit` ENABLE KEYS */;

-- Dumping structure for table bankapi.history_transaksi
CREATE TABLE IF NOT EXISTS `history_transaksi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dates` date DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `rekening_id` int(11) DEFAULT NULL,
  `bank_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.history_transaksi: ~0 rows (approximately)
/*!40000 ALTER TABLE `history_transaksi` DISABLE KEYS */;
INSERT INTO `history_transaksi` (`id`, `dates`, `type`, `nominal`, `rekening_id`, `bank_id`) VALUES
	(1, '2019-04-06', 'Deposit', 120000, 1, 2),
	(2, '2019-04-06', 'Deposit', 50000, 2, 1),
	(3, '2019-04-06', 'Withdraw', 25000, 2, 1),
	(4, '2019-04-06', 'Deposit', 25000, 1, 2);
/*!40000 ALTER TABLE `history_transaksi` ENABLE KEYS */;

-- Dumping structure for table bankapi.mutasi
CREATE TABLE IF NOT EXISTS `mutasi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dates` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `saldo_last` int(11) DEFAULT NULL,
  `rekening_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.mutasi: ~0 rows (approximately)
/*!40000 ALTER TABLE `mutasi` DISABLE KEYS */;
INSERT INTO `mutasi` (`id`, `dates`, `description`, `type`, `nominal`, `saldo_last`, `rekening_id`) VALUES
	(1, '2019-04-06', 'Input saldo', 'Deposit', 120000, 120000, 1),
	(2, '2019-04-06', 'Input saldo', 'Deposit', 50000, 50000, 2),
	(3, '2019-04-06', 'Transfer saldo ke rekening 9116365131', 'Withdraw', 25000, 22000, 2),
	(4, '2019-04-06', 'Menerima saldo dari rekening 7351528413', 'Deposit', 25000, 145000, 1);
/*!40000 ALTER TABLE `mutasi` ENABLE KEYS */;

-- Dumping structure for table bankapi.nasabah
CREATE TABLE IF NOT EXISTS `nasabah` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `born` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.nasabah: ~0 rows (approximately)
/*!40000 ALTER TABLE `nasabah` DISABLE KEYS */;
INSERT INTO `nasabah` (`id`, `name`, `address`, `phone`, `gender`, `city`, `born`, `created_at`, `updated_at`) VALUES
	(1, 'Yusril Rapsanjani', 'Jalan kebun jeruk', '08158482458', 'Laki-Laki', 'Jakarta', '1999-06-26', '2019-04-06 11:51:26', '2019-04-06 11:51:26'),
	(2, 'Reza Ahmad', 'Jalan kebun jeruk', '081522382458', 'Laki-Laki', 'Jakarta', '1999-06-26', '2019-04-06 11:52:15', '2019-04-06 11:52:15');
/*!40000 ALTER TABLE `nasabah` ENABLE KEYS */;

-- Dumping structure for table bankapi.rekening
CREATE TABLE IF NOT EXISTS `rekening` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_rekening` varchar(50) NOT NULL DEFAULT '0',
  `pin` varchar(7) NOT NULL DEFAULT '0',
  `saldo` int(11) NOT NULL DEFAULT '0',
  `nasabah_id` int(11) NOT NULL DEFAULT '0',
  `bank_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.rekening: ~0 rows (approximately)
/*!40000 ALTER TABLE `rekening` DISABLE KEYS */;
INSERT INTO `rekening` (`id`, `no_rekening`, `pin`, `saldo`, `nasabah_id`, `bank_id`) VALUES
	(1, '9116365131', '6256962', 145000, 1, 2),
	(2, '7351528413', '1234567', 22000, 2, 1);
/*!40000 ALTER TABLE `rekening` ENABLE KEYS */;

-- Dumping structure for table bankapi.transfer
CREATE TABLE IF NOT EXISTS `transfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dates` date DEFAULT NULL,
  `rekening_id` int(11) DEFAULT NULL,
  `to_rekening_id` int(11) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.transfer: ~0 rows (approximately)
/*!40000 ALTER TABLE `transfer` DISABLE KEYS */;
INSERT INTO `transfer` (`id`, `dates`, `rekening_id`, `to_rekening_id`, `nominal`, `description`) VALUES
	(1, '2019-04-06', 2, 1, 25000, 'Input saldo');
/*!40000 ALTER TABLE `transfer` ENABLE KEYS */;

-- Dumping structure for table bankapi.withdraw
CREATE TABLE IF NOT EXISTS `withdraw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dates` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nominal` int(11) DEFAULT NULL,
  `rekening_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table bankapi.withdraw: ~0 rows (approximately)
/*!40000 ALTER TABLE `withdraw` DISABLE KEYS */;
INSERT INTO `withdraw` (`id`, `dates`, `description`, `nominal`, `rekening_id`) VALUES
	(1, '2019-04-06', 'Transfer saldo ke rekening 9116365131', 25000, 2);
/*!40000 ALTER TABLE `withdraw` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
