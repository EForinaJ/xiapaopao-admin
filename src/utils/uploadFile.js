import md5 from 'js-md5' //引入MD5加密
import { fileUpload } from '@/api/common.js'  // 这里指前端调用接口的api方法
export const uploadByPieces = ({ randoms, file, pieceSize = 2, progress, success, error }) => {
  // 如果文件传入为空直接 return 返回
  if (!file || !file.length) return
  let fileMD5 = ''// 总文件列表
  const chunkSize = pieceSize * 1024 * 1024 // 5MB一片
  const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
  // 获取md5
  const readFileMD5 = () => {
    // 读取视频文件的md5
    console.log("获取文件的MD5值")
    let fileRederInstance = new FileReader()
    console.log('file', file)
    fileRederInstance.readAsBinaryString(file)
    fileRederInstance.addEventListener('load', e => {
      let fileBolb = e.target.result
      fileMD5 = md5(fileBolb)
      console.log('fileMD5', fileMD5)
      console.log("文件未被上传，将分片上传")
      readChunkMD5()

    })
  }
  const getChunkInfo = (file, currentChunk, chunkSize) => {
    let start = currentChunk * chunkSize
    let end = Math.min(file.size, start + chunkSize)
    let chunk = file.slice(start, end)
    return { start, end, chunk }
  }
  // 针对每个文件进行chunk处理
  const readChunkMD5 = () => {
    // 针对单个文件进行chunk上传
    for (var i = 0; i < chunkCount; i++) {
      const { chunk } = getChunkInfo(file, i, chunkSize)
      console.log("总片数" + chunkCount)
      console.log("分片后的数据---测试：" + i)
      console.log(chunk)
      uploadChunk({ chunk, currentChunk: i, chunkCount })
    }
  }
  const uploadChunk = (chunkInfo) => {
    // progressFun()
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  // 创建formData对象，下面是结合不同项目给后端传入的对象。
    let fetchForm = new FormData()
    fetchForm.append('identifier', randoms)
    fetchForm.append('chunkNumber', chunkInfo.currentChunk + 1)
    fetchForm.append('chunkSize', chunkSize)
    fetchForm.append('currentChunkSize', chunkInfo.chunk.size)
    fetchForm.append('file', chunkInfo.chunk)
    fetchForm.append('filename', file.name)
    fetchForm.append('totalChunks', chunkInfo.chunkCount)
    fetchForm.append('totalSize', chunkSize)
    // fetchForm.append('md5', fileMD5)
    fileUpload(fetchForm, config).then(res => {
      console.log("分片上传返回信息："+ res)
      if (res.code == 200) {
    // 结合不同项目 将成功的信息返回出去，这里可变的是指 res.data[0]
        success(res.data[0])
    // 下面如果在项目中没有用到可以不用打开注释
        // if (chunkInfo.currentChunk < chunkInfo.chunkCount - 1) {
        //   console.log("分片上传成功")

        // } else {
        //   // 当总数大于等于分片个数的时候
        //   if ((chunkInfo.currentChunk + 1) == chunkInfo.chunkCount) {
        //     console.log("文件开始------合并成功")
        //     success(res.data[0])
        //   }
        // }
      }
      else {
        console.log(res.message)
      }
    }).catch((e) => {
      error && error(e)
    })
  }
  readFileMD5() // 开始执行代码
}