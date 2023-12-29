export const RichText = {
      block: {
        h1: ({children}:any) => <h1 className="tracking-tight leading-tight text-5xl pb-4 block-text">{children}</h1>,
        h2: ({children}:any) => <h2 className="tracking-tight leading-tight text-4xl pb-4 block-text">{children}</h2>,
        h3: ({children}:any) => <h3 className="tracking-tight leading-tight text-3xl pb-4 block-text">{children}</h3>,
        h4: ({children}:any) => <h4 className="tracking-tight leading-tight text-2xl pb-4 block-text">{children}</h4>,
        h5: ({children}:any) => <h5 className="tracking-tight leading-tight text-xl pb-4 block-text">{children}</h5>,
        h6: ({children}:any) => <h6 className="py-10">{children}</h6>,
        normal: ({children}:any) => <p className="text-sm pb-4">{children}</p>,
        blockquote: ({children}:any) => <blockquote className="tracking-tight leading-tight text-5xl pb-4 block-text">{children}</blockquote>,
      },
      list: {
        bullet: ({children}:any) => <ul className="ml-5 mt-xl list-disc block-text">{children}</ul>,
        number: ({children}:any) => <ol className="mt-lg block-text">{children}</ol>,
        checkmarks: ({children}:any) => <ol className="m-auto text-lg block-text">{children}</ol>,
      },
  }