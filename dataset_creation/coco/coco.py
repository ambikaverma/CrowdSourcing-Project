from pycocotools.coco import COCO

import random

# load MS COCO 2017 instances training annotations
annFile = '/home/dang/datasets/Coco17/annotations/instances_train2017.json'
coco = COCO(annFile)

# PASCAL VOC categories
categories = ['airplane', 'bicycle', 'bird',       'boat',   'bottle',       \
              'bus',      'car',     'cat',        'chair',  'cow',          \
              'dog',      'horse',   'motorcycle', 'person', 'potted plant', \
              'sheep',    'sofa',    'table',      'train',  'TV'            ]

# randomly sample 25 images for each category
num_samples = 25
images = []
for cat in categories:
    catIds = coco.getCatIds(catNms=[cat])
    imgIds = coco.getImgIds(catIds=catIds)
    imgIds = [imgIds[i] for i in random.sample(range(len(imgIds)), 25)]
    images += imgIds

# remove duplicates
images = [str(image).zfill(12) + '.jpg' for image in images]
images = sorted(list(set(images)))

# save list of images to disk
images = sorted(images)
with open('./images.txt', 'w') as handle:
    handle.write('\n'.join(images))

