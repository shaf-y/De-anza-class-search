import PrereqDecoder from './PrereqDecoder';
import PrereqForDecoder from './PrereqForDecoder';

export default function CourseCard({ course, prereqFor }) {
  return (
    <div className="w-full bg-white border border-gray-300 mb-4 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header aligned with Mission College's style */}
      <div className="bg-[#333333] text-white px-5 py-3 flex flex-col md:flex-row justify-between md:items-center">
        <h2 className="text-base font-semibold tracking-wide">
          {course.code}: {course.title}
        </h2>
        <span className="text-sm font-medium mt-1 md:mt-0 text-gray-300 whitespace-nowrap">
          {course.units} Units
        </span>
      </div>
      
      {/* Body */}
      <div className="p-5 flex flex-col h-full">
        <p className="text-gray-700 text-sm leading-relaxed max-w-4xl flex-grow">
          {course.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:gap-6 mt-auto">
          <PrereqDecoder prereqString={course.prerequisites} />
          <PrereqForDecoder prereqForList={prereqFor} />
        </div>
      </div>
    </div>
  );
}
