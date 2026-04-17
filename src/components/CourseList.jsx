import CourseCard from './CourseCard';

export default function CourseList({ courses, prereqForMap }) {
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-md border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-1">No courses found</h2>
        <p className="text-sm text-gray-500">Please adjust your search criteria and try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-0">
      {courses.map((course, idx) => (
        <CourseCard key={course.code + idx} course={course} prereqFor={prereqForMap?.[course.code] || []} />
      ))}
    </div>
  );
}
