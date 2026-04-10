import fs from 'fs';
import path from 'path';

export default function TempCertsPage() {
  const certsDir = path.join(process.cwd(), 'src/components/Certificates');
  const files = fs.readdirSync(certsDir).filter(f => f.match(/\.(png|jpg|jpeg)$/i));

  return (
    <div className="p-10 bg-black text-white">
      <h1 className="text-3xl font-bold mb-10">Certificate Identification</h1>
      <div className="grid grid-cols-1 gap-20">
        {files.map((file, idx) => (
          <div key={file} className="border border-white/20 p-5 rounded-xl">
            <h2 className="text-xl mb-4">{idx + 1}. {file}</h2>
            <img 
              src={`/_next/image?url=${encodeURIComponent('/../src/components/Certificates/' + file)}&w=1200&q=75`} 
              alt={file}
              className="max-w-4xl h-auto rounded-lg shadow-2xl"
              // Note: Using a trick to access src/components/Certificates if public is not linked.
              // Actually, maybe I should just copy them to public/temp first.
            />
          </div>
        ))}
      </div>
    </div>
  );
}
