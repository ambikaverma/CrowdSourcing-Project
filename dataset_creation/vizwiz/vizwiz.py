import json
import os
import random

# load VizWiz training annotations
# annotations = json.load(open('/home/dang/datasets/VizWiz/Annotations/train.json'))

# get selected subset of VizWiz training images
images = list(os.walk('subset'))[0][2]

# randomly sample 100 'answerable' images from the training set
num_samples = 100
# images = [annotation['image'] for annotation in annotations if \
#           annotation['answerable'] and annotation['answer_type'] != 'unanswerable']
images = sorted([images[i] for i in random.sample(range(len(images)), num_samples)])

# save list of images to disk
with open('./images.txt', 'w') as handle:
    handle.write('\n'.join(images))

