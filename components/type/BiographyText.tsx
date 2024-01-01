export const BiographyText = {
      block: {
        normal: ({children}:any) => <p className="text-sm pb-4">{children}</p>,
        blockquote: ({children}:any) => <blockquote className="tracking-tight leading-tight text-5xl pb-4 block-text">{children}</blockquote>,
      },
  }