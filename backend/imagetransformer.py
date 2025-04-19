import streamlit as st
from PIL import Image, ImageFilter
import io
import numpy as np
from rembg import remove


st.set_page_config(page_title="AI Image Transformer", page_icon="🖼️", layout="wide")

TRANSFORMATIONS = {
    'Background Remove': {
        'function': lambda img: remove(img),
        'needs_input': False,
        'desc': "Remove background automatically using AI"
    },
    'AI Drop Shadow': {
        'function': lambda img: add_shadow(img),
        'needs_input': False,
        'desc': "Add realistic drop shadow effect"
    },
    'Contrast': {
        'function': lambda img, factor=1.5: adjust_contrast(img, factor),
        'needs_input': True,
        'desc': "Enhance image contrast by custom percentage"
    },
    'Grayscale': {
        'function': lambda img: img.convert('L'),
        'needs_input': False,
        'desc': "Convert to black and white"
    },
    'Blur': {
        'function': lambda img, radius=10: img.filter(ImageFilter.GaussianBlur(radius)),
        'needs_input': True,
        'desc': "Apply Gaussian blur with custom radius"
    },
    'Flip': {
        'function': lambda img: img.transpose(Image.FLIP_LEFT_RIGHT),
        'needs_input': False,
        'desc': "Flip image horizontally"
    }
}

def add_shadow(img):
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    shadow = Image.new('RGBA', (img.width+10, img.height+10), (0,0,0,0))
    shadow.paste((0,0,0,100), [5,5,img.width+5,img.height+5])
    shadow.paste(img, (0,0), img)
    return shadow

def adjust_contrast(img, factor):
    arr = np.array(img).astype(float)
    arr = np.clip(arr * factor, 0, 255)
    return Image.fromarray(arr.astype(np.uint8))

st.title("🖼️ Image Transformer")
st.markdown("Apply transformations")

with st.sidebar:
    st.header("Transformations")
    selected_transform = st.selectbox(
        "Choose transformation",
        options=list(TRANSFORMATIONS.keys()),
        format_func=lambda x: f"✨ {x}"
    )
    if selected_transform:
        user_input = None
        if selected_transform == "Contrast":
            user_input = st.slider("Contrast Percentage", min_value=50, max_value=200, value=150, step=10)
        elif selected_transform == "Blur":
            user_input = st.slider("Blur Radius", min_value=1, max_value=50, value=10, step=1)
        st.caption(TRANSFORMATIONS[selected_transform]['desc'])

col1, col2 = st.columns(2)
uploaded_file = st.file_uploader(
    "Upload an image (JPG, PNG)",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file is not None:
    with col1:
        st.subheader("Original Image")
        original_img = Image.open(uploaded_file)
        st.image(original_img, use_container_width=True)
    
    if st.button(f"Apply {selected_transform}"):
        with st.spinner(f"Applying {selected_transform}..."):
            try:                
                transform = TRANSFORMATIONS[selected_transform]
                transformed_img = transform['function'](original_img)
                with col2:
                    st.subheader("Transformed Image")
                    st.image(transformed_img, use_container_width=True)
                    img_bytes = io.BytesIO()
                    transformed_img.save(img_bytes, format='PNG')
                    st.download_button(
                        label="Download Result",
                        data=img_bytes.getvalue(),
                        file_name=f"transformed_{selected_transform.lower().replace(' ', '_')}.png",
                        mime="image/png"
                    )
                st.success("Transformation complete!")
            except Exception as e:
                st.error(f"Error: {str(e)}")
st.markdown("""
### Features Included:
- **Background Remove**
- **AI Drop Shadow**
- **Contrast/Grayscale**
- **Blur**
- **Flip**
""")
