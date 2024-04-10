import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  SearchTextbox,
  Stack,
  Text,
  TextboxNumeric,
  VerticalSpace,
  Code,
} from "@create-figma-plugin/ui"
import { emit } from "@create-figma-plugin/utilities"
import { h } from "preact"
import { useCallback, useEffect, useState } from "preact/hooks"
import styles from "./styles.css"

import { copyToClipboardAsync } from "figx"

function Plugin({ data }) {
  useEffect(() => {
    // console.log(data)
    // console.log(data["Alias-Dark"].borderRadius.lg.$value)
  }, [])
  const [search, setSearch] = useState("")
  const handleSearch = (e) => {
    const newValue = e.currentTarget.value
    setSearch(newValue)
  }
  const handleCopy = async (value) => {
    // emit("COPY", value)
    // try {
    //   await copyToClipboardAsync(value)
    //   figma.notify(`${value} copied`)
    // } catch (err) {
    //   console.error("Failed to copy:", err)
    // }
  }
  return (
    <Container space='medium'>
      <div className={styles["search-box"]}>
        <SearchTextbox
          onInput={handleSearch}
          placeholder='Search component variables'
          value={search}
        />
      </div>

      <VerticalSpace space='small' />
      <Stack space='extraSmall'>
        {Object.keys(data.components)
          .filter((key) => {
            return key.includes(search)
          })
          .map((key, i) => {
            return (
              <div
                className={styles.item}
                key={i}
                onClick={() => {
                  handleCopy(
                    data.components[key].replace("{", "").replace("}", "")
                  )
                }}
              >
                <div className={styles["item-left"]}>
                  <div className={styles["item-key"]}>{key}</div>
                  <div className={styles["item-value"]}>
                    {/* <Code> */}
                    {data.components[key].replace("{", "").replace("}", "")}
                    {/* </Code> */}
                  </div>
                </div>
                {/* <div className={styles["item-right"]}>copy</div> */}
              </div>
            )
          })}
      </Stack>
      <VerticalSpace space='medium' />
    </Container>
  )
}

export default render(Plugin)
