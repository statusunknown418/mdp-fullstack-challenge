import { NextPage } from 'next'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

export const ScrollArea: NextPage = ({ children }) => {
  return (
    <ScrollAreaPrimitive.Root className="container h-52 rounded-primary">
      <ScrollAreaPrimitive.Viewport className="w-full h-full rounded-primary border border-border-primary">
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollAreaPrimitive.ScrollAreaScrollbar
        orientation="vertical"
        className="flex-1 relative scrollbar-custom-track"
      >
        <ScrollAreaPrimitive.Thumb className="flex-1 relative bg-indigo-600 rounded-primary scrollbar-custom-thumb" />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    </ScrollAreaPrimitive.Root>
  )
}
