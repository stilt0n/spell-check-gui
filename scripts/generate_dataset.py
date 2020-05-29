# This file generates the dataset for the language model
import sys
import os
import re

def create_dataset(infile, outfile):
	
	if not outfile.endswith('.ts'):
		print('ERR: output file needs to be a TypeScript file and should end with the .ts extension')
		sys.exit(0)

	print(f'reading from {infile}...')
	if os.path.isfile(infile):
		with open(infile) as f:
			raw_dataset = f.read()
	else:
		print('ERR: input file does not exist')

	print('processing dataset...')

	lines = raw_dataset.split('\n')
	lines = ['<s> ' + ' '.join(re.findall(r'\w+', line.lower())) for line in lines if len(re.findall(r'\w+', line))]

	print(f'writing dataset to {outfile}')
	with open(outfile, 'w+') as f:
		f.write('export const dataString : string = `')
		
		for line in lines:
			f.write(f'{line}\n')
		# removes last newline character and closes the template string
		f.write('\b`;')

	print(f'successfully wrote dataset to {outfile}')

if len(sys.argv) == 3:
	create_dataset(sys.argv[1], sys.argv[2])
else:
	print('USAGE: takes a dataset and turns it into a TypeScript file that exports the dataset as a template string')
	print('this script needs two arguments: the dataset file path and the path to write the TypeScript file to')
	print('\nFormat: Python generate_dataset.py <input file path> <output.ts>')