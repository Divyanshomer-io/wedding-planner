// Simulated network latency (300-1200ms), configurable.
let range: [number, number] = [300, 1200]

export const setMockDelay = (min: number, max: number) => {
  range = [min, max]
}

export const mockDelay = () =>
  new Promise<void>((resolve) => setTimeout(resolve, range[0] + Math.random() * (range[1] - range[0])))
