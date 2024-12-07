pip install --no-cache-dir -r requirements.txt
python -m spacy download en_core_web_sm
apt-get update && apt-get install -y \
    build-essential \
    libjpeg-dev \
    liblapack-dev \
    libopenblas-dev \
    libpng-dev \
    python3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
