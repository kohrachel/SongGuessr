from diffusers import StableDiffusionPipeline
import torch
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

model_id = "sd-legacy/stable-diffusion-v1-5"
huggingface_token = os.getenv("HUGGINGFACE_TOKEN")  # Get the token from the environment variable

pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16, revision="main", use_auth_token=huggingface_token)
pipe = pipe.to("cuda")

prompt = "a photo of two stuff animal dogs, one is blue one is yellow-ochre, and they are both on a cotton candy cloud"
image = pipe(prompt).images[0]  

image.save("astronaut_rides_horse.png")
