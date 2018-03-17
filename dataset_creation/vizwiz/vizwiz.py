import json
import random

# load VizWiz training annotations
annotations = json.load(open('/home/dang/datasets/VizWiz/Annotations/train.json'))

# randomly sample 1000 'answerable' images from the training set
num_samples = 1000
images = [annotation['image'] for annotation in annotations if annotation['answerable']]
images = sorted([images[i] for i in random.sample(range(len(images)), num_samples)])

# save list of images to disk
with open('./images.txt', 'w') as handle:
    handle.write('\n'.join(images))

