export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <img src="/favicon.png" alt="StrataReady" style={{ width: size, height: size, borderRadius: size * 0.214 }} />
  )
}
