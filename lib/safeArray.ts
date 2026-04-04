export default function safeArray(arr: any) {
  return Array.isArray(arr) ? arr : []
}