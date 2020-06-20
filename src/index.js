import program from 'commander';

const programm = program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);

export default programm;
