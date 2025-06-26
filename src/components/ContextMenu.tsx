"use client";

export default function ContextMenu() {
  return (
    <div className="flex justify-center">
      <div className="relative inline-block mx-auto">
        {/* Context Menu */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-48 relative">
          <div className="px-3 py-2 text-gray-700 cursor-pointer text-sm">
            Rename
          </div>
          <div className="px-3 py-2 text-gray-700 cursor-pointer text-sm">
            Delete
          </div>

          <hr className="border-gray-200 my-1" />
          <div className="px-3 py-2 text-gray-700 bg-gray-100 cursor-pointer text-sm relative">
            New file
            <div
              className="pointer-events-none"
              style={{
                position: "absolute",
                left: 20,
                top: 17,
                width: 16,
                height: 16,
                background: "#000",
                clipPath: `
      polygon(0px 0px, 0px 14px, 3px 11px, 5px 16px, 8px 15px, 6px 10px, 10px 9px)
    `,
                transform: "rotate(-15deg)",
                transformOrigin: "0 0",
              }}
            />
          </div>

          <div className="px-3 py-2 text-gray-700 cursor-pointer text-sm">
            New folder
          </div>

          <hr className="border-gray-200 my-1" />

          <div className="px-3 py-2 text-gray-700 cursor-pointer text-sm">
            Upload
          </div>
        </div>
      </div>
    </div>
  );
}
