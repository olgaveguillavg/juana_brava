import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect = typeof window > "u" ? useEffect : useLayoutEffect;
