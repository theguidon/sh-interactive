export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`)
  }
  if (typeof DOMParser === "undefined") {
    await import("xmldom")
  }
}
