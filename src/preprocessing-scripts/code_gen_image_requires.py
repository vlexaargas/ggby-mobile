# run from containing folder
# requires python 3.X

# Example usage: python3 TODO

import shutil
import os
import sys

instructor_input_path = "assets/images/instructors/"
instructor_require_path = "../../../assets/images/instructors/" # path from require location in code to bundled images
instructor_map_name = 'instructorPicMap'

workshop_input_path = "assets/images/workshops/"
workshop_require_path = "../../../assets/images/workshops/" # path from require location in code to bundled images
workshop_map_name = 'eventPicMap'

#slackro:                                require("../../../assets/images/events/slackro.jpg"),
#default:          require("../../../assets/images/default-profile.jpg"), // todo get gender non specific

def code_gen_require(image_file_name, require_path):
	key = image_file_name.split('.')[0]
	value = require_path + image_file_name
	return f"\"{key}\": require(\"{value}\")"

def is_img_file(file_path):
	# Ignores .files like .DS_store
	return file_path[0] != '.'

def code_gen(input_path, require_path, map_name):
	file_names = sorted(os.listdir(input_path))
	require_statements = [code_gen_require(x, require_path) for x in file_names if is_img_file(x)]
	require_map = ",\n  ".join(require_statements)
	return f"""export const {map_name} = {{
  {require_map}
  }};
"""

instructor_require_module = code_gen(instructor_input_path, instructor_require_path, instructor_map_name)
workshop_require_module = code_gen(workshop_input_path, workshop_require_path, workshop_map_name)


eventAssetDetails = open('src/features/schedule/EventImageAssets.js', 'w+')
eventAssetDetails.write(instructor_require_module)
eventAssetDetails.write('\n')
eventAssetDetails.write(workshop_require_module)
eventAssetDetails.close()