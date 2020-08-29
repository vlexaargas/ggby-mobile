# run from containing folder
# requires python 3.X

# Example usage: 
# python3 add_workshop_headers.py "/Users/danny-slacklineus/Downloads/GGBY Teacher Headshots/"

import shutil
import os
import sys
import re

input_path = sys.argv[1]
output_path = "assets/images/workshops/"
#workshop_titles = ["Welcome Vinyasa", "NamaShakeIt", "Pointless Play: A Hooping Workshop", "Meet and Greet!: A Connection _Jam_", "Find Your Flow", "Sunrise Yoga Flow", "Letting Go of Perfectionism and Form in Yoga: Functional Anatomy", "Shoulder Anatomy Workshop & Yin Yoga", "Sunrise Pranayam: Breathwork", "ZenPlay: Movement Communication", "Parkour for Play", "AcroLatin Dance Flow", "Chromatic Dance Twerkshop", "Casual Acro : A Guided Acro Jam for All Levels", "Bo Staff Basics", "Soft Shackle Construction", "Off-Grid Solar Systems: 24/12 Volt", "How NOT to Highline Q&A", "Dirtbag rope play", "Noise and Harmony: Improv Music Discussion and Guided Jam Session", "Highlining Techniques for Beginners", "Mount It Like It's Hot", "Tandem Slackline", "Shoulder Stand on the Slackline!", "Slackline Techniques and Flow Management: A Slackline _Jam_", "Aerial Conditioning for Maximum Vascularity 101", "Sunrise Yoga", "Flexibility and Stretching", "Mindfulness and Meditation", "Sunrise Ecstatic Dance", "Aerial Actions!", "Beginner Acroyoga for All", "Conscious Contact Dance", "Sassy Acro: The Art of Acro Performance for All Levels", "Introductory to Intermediate Juggling: Solo and Passing", "Movement Games! Inspired by the Ido Portal method", "Coffee Talks: Flow with Josh Beaudoin", "Herbal Medicine Storytelling & Sharing Circle", "What Are You Made Of?!", "Slackline U.S. Ambassadors Program", "_Tech Support_", "Learning Shibari", "Women's Highline Clinic", "Beginner Slackline Yoga Flow", "Rigging Basics", "Highlining Techniques for Beginners", "Fruit Bowl Tour with the Bureau of Land Management", "Anusara Yoga Workshop", "Therapeutic Partner Yoga", "Sound Guided Meditation", "How to Stand on your Hands", "Acro Hand to Hand", "Acroyoga: Intermediate L-Base Washing Machines ", "Advanced Standing Acro", "Massage for when your everything hurts", "Group Breathwork & OM Circle", "Heart Expanding Cacao Ceremony", "Psychadelics as Medicine: A Discussion Circle", "Your Voice is a Force of God: Finding the Power in You", "Everyday Acts of Revolution", "Stick-and-Poke 101", "Moving Forward from Grief", "Intro to Slackline Yoga", "Intermediate/Advanced Slackline Yoga", "Freestyle on Longlines and Highlines", "Highline Rescue", "Intro & Intermediate Aerial Silks with CynCurrieBird", "Thai-Yoga Massage and the Power of Healing Touch", "Sensual movement", "Finding Cranial Sacral Rhythm and Unwinding"]

print("input path: " + input_path)


def clean(image_file_name):
	image_file_parts = image_file_name.split('.')
	image_file_parts = [x.strip().lower().replace('_', '').replace(' ', '_') for x in image_file_parts]
	clean_image_file_name = '.'.join(image_file_parts)
	return clean_image_file_name

image_file_names = os.listdir(input_path)
#print("Found images: ")
#print(image_file_names)

clean_img_names = [clean(x) for x in image_file_names]
#clean_titles = [clean(x) for x in workshop_titles]

#print("generated cleaned file names:")
#print(sorted(clean_img_names))
#print(sorted(clean_titles))

#intersection = set(clean_titles).intersection(set(clean_img_names))
#difference = set(clean_titles) - set(clean_img_names)
#print(f"intersection: {intersection}")
#print(f"difference: {difference}")

# copy files with cleaned file names
for file_name in zip(image_file_names, clean_img_names):
	shutil.copy(input_path + file_name[0], output_path + file_name[1])
