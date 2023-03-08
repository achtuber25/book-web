import { useState } from 'react';
import { uploadFile } from 'react-s3'
import Wrapper from './Wrapper';
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';
import { Buffer } from "buffer";
import { obj } from './config'

window.Buffer = Buffer
const Config = {
    bucketName: "familydocsmemories",
    dirName: 'images',
    region: 'ap-south-1',
    accessKeyId: "AKIARIDVHDSA5FQWLZ4H",
    secretAccessKey: "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"
}

const btn = {
    display: "auto",
    minWidth: "120px",
    height: "100%",
    color: "#2e0006",
    border: "1px solid #38b6ff",
    placeSelf: "center",
}

const UploadFiles = (props) => {
    const [images, setImages] = useState([]);
    const [uploader, setUploader] = useState('Upload all');

    const maxNumber = 10000;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    const fileUploader = async () => {
        setUploader("Uploading...")
        for (let index = 0; index < images.length; index++) {
            await uploadFile(images[index].file, Config)
            setUploader("Uploading..." + (index + 1).toString())
        }
        setUploader("All done")
        setImages([])
        toast.success("Upload successful", {
            theme: "dark",
            position: "top-right",
            autoClose: 2000,
        });
        setUploader("Upload all")
    }

    return (
        <Wrapper self="center">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper" style={{ marginTop: "10px", marginBottom: "70px" }}>
                        <button
                            className="btn btn-outline-success"
                            style={{
                                position: "fixed",
                                width: "110px",
                                right: "5px",
                                bottom: "260px",
                                color: "#2e0006",
                                backgroundColor: "#38b6ff",
                                border: "1px solid grey",
                                placeSelf: "center",
                            }}
                            id="btnsearch"
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Add images
                        </button>
                        <button className="btn btn-outline-success" id="btnsearch" style={
                            {
                                position: "fixed",
                                width: "110px",
                                right: "5px",
                                bottom: "190px",
                                color: "#2e0006",
                                backgroundColor: "#38b6ff",
                                border: "1px solid grey",
                                placeSelf: "center",
                            }
                        } onClick={onImageRemoveAll}>Remove all</button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item" style={{ marginTop: "10px" }}>
                                <img src={image['data_url']} alt="" style={{ width: "auto", maxWidth: "97vw", height: "auto" }} />
                                <div className="image-item__btn-wrapper" style={{ marginTop: "10px" }}>
                                    <button className="btn btn-outline-success" id="btnsearch" style={btn}
                                        onClick={() => onImageUpdate(index)}>Update</button>
                                    <button className="btn btn-outline-success" id="btnsearch" style={btn} onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </ImageUploading>
            <ToastContainer style={{ marginTop: "100px", marginLeft: "30vw", width: "70vw", maxWidth: "400px" }} />
            <button className="btn btn-outline-success" id="btnsearch" type="submit" style={{
                position: "fixed",
                bottom: "120px",
                right: "5px",
                minWidth: "110px",
                color: "#2e0006",
                backgroundColor: "#38b6ff",
                border: "1px solid grey",
            }}
                onClick={fileUploader}
            >{uploader}</button>
        </Wrapper>
    )
}

export default UploadFiles