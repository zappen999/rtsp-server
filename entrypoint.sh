#!/bin/bash

# Start processes specified in JSON config
pm2 start /surveillance/app/processes.json

# To keep the container alive
pm2 logs
