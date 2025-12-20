export default function Footer() {
  return (
    <div className="w-full py-10 bg-gray-100 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} LnF — All rights reserved.</p>
      </div>
    </div>
  );
}
