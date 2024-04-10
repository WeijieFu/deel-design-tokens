import { once, on, showUI } from "@create-figma-plugin/utilities"
import { flatten } from "flat"
import data from `./data/rebrand.json`
export default async function () {
  const variables = transform(data)
  on("COPY", handleCopy)
  showUI({
    height: 137,
    width: 240,
  }, {data: variables})
}

const transform = (data)=>{
  const obj = flatten(data)
  const components = {}

  for (const key in obj){
    if (key.startsWith('Components') && key.endsWith('$value') && obj[key.replace('$value','$type')]== "color"){
      const arr = key.split(".")
      arr.shift()
      arr.pop()
      components[arr.join('/')] = obj[key]
    }
  }

  return {
    components: components
  }
}

const handleCopy = async (value)=>{
  console.log(value)
  try {
    // await copyToClipboardAsync(value)
    figma.notify(`${value} copied`)
  }catch (err){
    console.error("Failed to copy:", err)
  }
}