import json

class JSONExtractor:
    def __init__(self, input_file, output_file):
        self.input_file = input_file
        self.output_file = output_file

    def extract_fields(self, fields):
        with open(self.input_file, 'r') as f:
            data = json.load(f)

        extracted_data = []
        for item in data:
            extracted_item = {}
            for field in fields:
                extracted_item[field] = item[field]
            extracted_data.append(extracted_item)

        with open(self.output_file, 'w') as f:
            json.dump(extracted_data, f)

inputFile = "Dorm-Occupants.json"
outputFile = "boysTenants.json"
extractor = JSONExtractor(inputFile, outputFile)


#Extracting Field for Girls 
# extractor.extract_fields(['#','Room','SR-Code', 'Name (Girls) R' ])

#Extracting Field for Boys
extractor.extract_fields(['#','Room','SR-Code.1', 'Name (Boys) L' ])

# # Steps 
# extract raw data
# filter girls and boys
# change girls and boys field to name
# combine json to a single field