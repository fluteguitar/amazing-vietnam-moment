NO_IMAGE = 34;
imagePath = 'media/images/'
listExlImages = [2, 4, 6, 7, 9, 11, 12,  14, 21, 25, 26,27, 28, 29, 30, 31];
listImage = [];
for(let i = 1; i <= NO_IMAGE; i++)
    if ( !listExlImages.includes(i) )
	listImage.push(i);
DEFAULT_LANG = "en";
DEFAULT_CAPTION_TEXT_EN = "Unknown source";
DEFAULT_CAPTION_TEXT_VI = "Không rõ nguồn"
