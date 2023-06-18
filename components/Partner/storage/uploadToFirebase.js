import firebase from 'firebase/compat/app'
import "firebase/compat/storage";


export class FirebaseStorage {
    constructor(files) {
        this.files = files
    }

    uploadFile = async (path, fileObject, onComplete, onError, onProgress, index) => {

        var storageRef = firebase.storage().ref();
        console.log(`fileObject : ${fileObject}`);


        var uploadTask = storageRef.child(path).put(fileObject)

        uploadTask.on('state_changed',
            (info) => { onProgress((info.bytesTransferred / info.totalBytes) * 100) },

            onError, async () => {
                var uri = await uploadTask.snapshot.ref.getDownloadURL()
                onComplete(uri, index)
            },
        )
    }


    uploadFileAsync = async (path, fileObject) => {

        if (!path || !fileObject) console.error(`file path or file data is missing`)
        if (!path || !fileObject) return { error: 'file path or file data is missing', success: false }

        var storageRef = firebase.storage().ref();

        var ref = storageRef.child(path)
        var metadata = { contentType: 'image/jpeg', public: true }

        const Buffer = await fileObject.arrayBuffer()

        await ref.put(Buffer, metadata)

        var downloadUrl = await ref.getDownloadURL()

        console.log('Download Url :: ' + downloadUrl)

        return ({ downloadLink: downloadUrl, success: true })

    }



    onProgress = (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
    }

}