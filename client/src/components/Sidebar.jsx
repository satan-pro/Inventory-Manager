export default function Sidebar() {
  return (
    <aside className="h-screen w-fit flex flex-col bg-blue-950 gap-5 text-gray-100 p-2.5 pt-8">
      <div className="logo w-12 h12 mb-10">LOGO</div>
      <ul>
        <li className="sidebar-options my-2.5">
            <a href="#">Sex</a>
        </li>
        <li>
            <a href="#">Sex 2</a>
        </li>
      </ul>
    </aside>
  );
}
