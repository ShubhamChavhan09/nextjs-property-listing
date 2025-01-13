import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About Us</h3>
            <p className="text-gray-600">
              Find your perfect property with our comprehensive platform.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@propertyplatform.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Instagram
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© 2024 Property Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
