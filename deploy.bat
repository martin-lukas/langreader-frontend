@ECHO OFF

call npm run build-prod-win

scp -i PATH_TO_PRIVATE_KEY -r build/* USER@IP_ADDRESS:frontend/