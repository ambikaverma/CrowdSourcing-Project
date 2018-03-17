import random

# dataset path
voc_path = '/home/dang/datasets/VOC2012/ImageSets/Main/'

# PASCAL VOC categories
categories = ['aeroplane',   'bicycle', 'bird',  'boat',      'bottle',   \
              'bus',         'car',     'cat',   'chair',     'cow',      \
              'diningtable', 'dog',     'horse', 'motorbike', 'person',   \
              'pottedplant', 'sheep',   'sofa',  'train',     'tvmonitor' ]

# randomly sample 25 images for each category
num_samples = 25
images = []
for category in categories:
    with open(voc_path + category + '_train.txt') as handle:
        entries = handle.readlines()

    category_images = []
    for entry in entries:
        entry = entry.rstrip()
        if entry[-2:] == ' 1':
            category_images.append(entry.split(' ')[0] + '.jpg')

    images += [category_images[i] for i in random.sample(range(len(category_images)), 25)]

# save list of images to disk
images = sorted(images)
with open('./images.txt', 'w') as handle:
    handle.write('\n'.join(images))

