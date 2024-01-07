import { ListMinus, Play, AreaChart } from "lucide-react";

export default function ArticleFormat({format}:any) {

  switch(format) {
    case 'Article':
      return <ListMinus strokeWidth={1} className="w-5" />;
      break;
    case 'Video':
    case 'Interview':
      return <Play strokeWidth={1} className="w-5" />;
      break;
    case 'Infographic':
      return <AreaChart strokeWidth={1} className="w-5" />;
      break;
    default:
      return '';
  }
}
