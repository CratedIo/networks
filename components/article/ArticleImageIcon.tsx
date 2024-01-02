import { ListMinus, Play, AreaChart } from "lucide-react";

export default function ArticleImageIcon( {format}:any ) {

  switch(format) {
    case 'Video':
    case 'Interview':
      return (
      <div className="absolute top-0 left-0 flex w-full h-full justify-center items-center group ">
        <div className="bg-primary/40 scale-100 p-2 group-hover:bg-primary/80 group-hover:scale-110 transition-all  duration-500 ">
          <Play strokeWidth={1} size={48} />
        </div>
      </div>);
      break;
    default:
      return null;
  }
}