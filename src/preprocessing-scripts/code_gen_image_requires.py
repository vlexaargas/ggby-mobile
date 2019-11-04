# run from containing folder
# requires python 3.X

# Example usage: python3 TODO

import shutil
import os
import sys

instructor_input_path = "assets/images/instructor-headshots/"
instructor_require_path = "../../../assets/images/instructor-headshots/" # path from require location in code to bundled images

workshop_header_input_path = "assets/images/workshop-images/"
work_require_path = "../../../assets/images/instructor-headshots/" # path from require location in code to bundled images


#slackro:                                require("../../../assets/images/events/slackro.jpg"),
#default:          require("../../../assets/images/default-profile.jpg"), // todo get gender non specific

def code_gen_require(image_file_name):
	key = image_file_name.split('.')[0]
	value = require_path + image_file_name
	return f"{key}: require(\"{value}\")"

def is_headshot_file(file_path):
	return file_path[0] != '.'

file_names = sorted(os.listdir(input_path))
require_statements = [code_gen_require(x) for x in file_names if is_headshot_file(x)]
require_map = ",\n  ".join(require_statements)

require_module = f"""export const instructorPicMap = {{
  {require_map}
  }};
"""

eventAssetDetails = open('src/features/schedule/EventImageAssets.js', 'w+')
eventAssetDetails.write(require_module)

print(require_module)