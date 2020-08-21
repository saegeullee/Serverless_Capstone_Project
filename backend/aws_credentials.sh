mkdir -p ~/.aws

cat > ~/.aws/credentials << EOL
[default]
aws_access_key_id=${AWS_ACCESS_KEY}
aws_secret_access_key=${AWS_SECRET_KEY}
EOL

cat > ~/.aws/config << EOL
[default]
region=ap-northeast-2
EOL

set AWS_SDK_LOAD_CONFIG=1