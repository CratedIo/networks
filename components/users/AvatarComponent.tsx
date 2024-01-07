import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { sanityImage } from "../utils/sanityImage"

export function AvatarComponent({
    image,
    name
}:{
    image:string | null,
    name:string
}) {

    var getInitials = function (fullname:string) {
        var parts = fullname.split(' ')
        var initials = ''
        for (var i = 0; i < parts.length; i++) {
          if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
          }
        }
        return initials
    }

  
  return (
    <Avatar>
        <AvatarImage src={image ? `${sanityImage(image)}?w=200` : ''} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  )
}
