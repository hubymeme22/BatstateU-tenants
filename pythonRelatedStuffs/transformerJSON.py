import json
#This class transforms old field to a new field name
class JSONTransformer:
    def __init__(self, input_file, output_file):
        self.input_file = input_file
        self.output_file = output_file

    def rename_field(self, old_field, new_field):
        with open(self.input_file, 'r') as f:
            data = json.load(f)

        for item in data:
            item[new_field] = item.pop(old_field)

        with open(self.output_file, 'w') as f:
            json.dump(data, f)

    #Should rename multiple fields but when It does it rename both the field but only accept one value. (Need to optimize if can)
    # def rename_fields(self, old_fields, new_field):
    #     with open(self.input_file, 'r') as f:
    #         data = json.load(f)

    #     for item in data:
    #         new_values = {}
    #         for old_field in old_fields:
    #             if old_field in item:
    #                 new_values[new_field] = item.pop(old_field)
    #         item.update(new_values)

    #     with open(self.output_file, 'w') as f:
    #         json.dump(data, f)

# Provide File name
input_file = 'boysTenants.json'
output_file = 'boysTenants.json'
#Provide Fields
old_field = "Name (Boys) L"
new_field = "Name"


transformer = JSONTransformer(input_file, output_file)  
transformer.rename_field(old_field, new_field)
