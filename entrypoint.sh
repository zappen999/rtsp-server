#!/bin/bash

# Start processes specified in JSON config
pm2 start processes.json

# To keep the container alive
pm2 logs
