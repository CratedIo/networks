import { ListMinus, Play, AreaChart } from "lucide-react";

export default function ArticleFormat( {format}:any ) {

  switch(format) {
    case 'Article':
      return <ListMinus strokeWidth={1} className="w-4" />;
      break;
    case 'Video':
    case 'Interview':
      return <Play strokeWidth={1} className="w-4" />;
      break;
    case 'Infographic':
      return <AreaChart strokeWidth={1} className="w-4" />;
      break;
    default:
      return '';
  }
}
