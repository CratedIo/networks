import { ListMinus, Play, AreaChart } from "lucide-react";

export default function ArticleImageIcon( {format}:any ) {

  switch(format) {
    case 'Video':
    case 'Interview':
      return <Play strokeWidth={1} className="w-16" />;
      break;
    default:
      return null;
  }
}
