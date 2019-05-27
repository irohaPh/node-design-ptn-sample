/**
 * 使い方
 * $ node useConcatFiles file1-2_marged.txt file1.txt file2.txt 
 */

const concatFiles = require('./concatFiles');

concatFiles(process.argv[2], process.argv.slice(3), () => console.log('Files concatenated successfully'))