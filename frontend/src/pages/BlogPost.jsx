import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Import blog data from NewsSection (matching data structure)
  const blogData = [
    {
      id: 1,
      title: "Outstanding Startups Honored at 6th Young Entrepreneur Awards",
      description: "About 65 startups across the country were honored at the 6th edition of the Young Entrepreneur Awards, held in Accra. The annual ceremony celebrates ambitious entrepreneurs making significant impacts in Ghana's economy.",
      date: "December 25, 2024",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "AGS Editorial Team",
      category: "Awards",
      readTime: "5 min read",
      content: `
        <p>The Association of Ghana Startups (AGS) was proud to host the 6th edition of the Young Entrepreneur Awards, recognizing 65 outstanding startups that are making significant impacts across various sectors in Ghana.</p>
        
        <h2>Celebrating Innovation and Excellence</h2>
        <p>This year's ceremony, held at the prestigious Movenpick Ambassador Hotel in Accra, brought together entrepreneurs, investors, government officials, and industry leaders to celebrate the achievements of Ghana's brightest startup minds.</p>
        
        <h3>Award Categories</h3>
        <ul>
          <li>Best Tech Startup of the Year</li>
          <li>Most Innovative Healthcare Solution</li>
          <li>Outstanding Social Impact Initiative</li>
          <li>Best Agricultural Technology</li>
          <li>Rising Star Entrepreneur</li>
          <li>Best Female-Led Startup</li>
          <li>Excellence in Financial Technology</li>
        </ul>
        
        <h2>Key Highlights</h2>
        <p>The event featured keynote speeches from successful entrepreneurs who shared their journey, challenges, and lessons learned. Network sessions provided valuable opportunities for startups to connect with potential investors and partners.</p>
        
        <blockquote class="border-l-4 border-green-500 pl-4 italic text-gray-700 my-6">
          "These young entrepreneurs represent the future of Ghana's economy. Their innovative solutions to local challenges demonstrate the incredible potential of our startup ecosystem." - AGS President
        </blockquote>
        
        <h3>Impact and Recognition</h3>
        <p>Winners received not only recognition but also access to mentorship programs, potential funding opportunities, and inclusion in AGS's accelerator program. The awards serve as a platform to showcase the diversity and quality of Ghana's startup landscape to both local and international audiences.</p>
        
        <h2>Looking Forward</h2>
        <p>The success of the 6th Young Entrepreneur Awards reinforces AGS's commitment to supporting and nurturing the next generation of business leaders. Plans are already underway for next year's ceremony, which promises to be even bigger and more impactful.</p>
        
        <p>For more information about the Young Entrepreneur Awards and how to participate in future editions, visit our website or contact our events team.</p>
      `
    },
    {
      id: 2,
      title: "Fintech Revolution: Ghana's Mobile Payment Surge",
      description: "Mobile money transactions in Ghana have reached unprecedented levels, with local fintech startups leading the charge in financial inclusion.",
      date: "January 15, 2025",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      author: "Kwame Asante",
      category: "Fintech",
      readTime: "4 min read",
      content: `
        <p>Ghana's fintech landscape has experienced explosive growth, with mobile money transactions reaching unprecedented levels. Local startups are at the forefront of this revolution, driving financial inclusion across the country.</p>
        
        <h2>The Mobile Money Boom</h2>
        <p>Mobile money services have become the backbone of Ghana's digital economy, with over 18 million active users conducting billions of cedis worth of transactions monthly. This growth has created opportunities for innovative fintech solutions.</p>
        
        <h3>Key Innovation Areas</h3>
        <ul>
          <li>Cross-border payments and remittances</li>
          <li>Micro-lending and credit scoring</li>
          <li>Digital savings and investment platforms</li>
          <li>Merchant payment solutions</li>
          <li>Insurance technology (InsurTech)</li>
        </ul>
        
        <h2>Success Stories</h2>
        <p>Several Ghanaian fintech startups have secured significant funding and expanded their operations across West Africa. Their success demonstrates the potential for local solutions to address regional financial challenges.</p>
        
        <blockquote class="border-l-4 border-green-500 pl-4 italic text-gray-700 my-6">
          "The partnership between traditional banks and fintech startups is creating a more inclusive financial ecosystem that serves both urban and rural populations." - Bank of Ghana Representative
        </blockquote>
        
        <h3>Looking Ahead</h3>
        <p>The future of fintech in Ghana looks promising, with increasing government support, regulatory clarity, and growing consumer adoption. These factors position the country as a leading fintech hub in West Africa.</p>
      `
    },
    {
      id: 3,
      title: "AgriTech Startups Transform Rural Farming",
      description: "Innovative agricultural technology companies are revolutionizing farming practices across Ghana, introducing smart irrigation systems and crop monitoring solutions.",
      date: "January 20, 2025",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
      author: "Ama Osei",
      category: "Agriculture",
      readTime: "6 min read",
      content: `
        <p>Ghana's agricultural sector is undergoing a digital transformation, with innovative AgriTech startups introducing cutting-edge solutions that are revolutionizing farming practices and boosting productivity.</p>
        
        <h2>Technology Meets Agriculture</h2>
        <p>From drone-powered crop monitoring to IoT-based irrigation systems, Ghanaian farmers are embracing technology to overcome traditional challenges and increase their yields by up to 40%.</p>
        
        <h3>Key Technologies</h3>
        <ul>
          <li>Smart irrigation and water management systems</li>
          <li>Drone-based crop monitoring and analysis</li>
          <li>Soil health testing and recommendations</li>
          <li>Weather prediction and climate adaptation tools</li>
          <li>Digital marketplaces for farmers</li>
        </ul>
        
        <h2>Impact on Rural Communities</h2>
        <p>These technological innovations are not just improving crop yields but also creating new economic opportunities in rural areas. Farmers report increased incomes and reduced post-harvest losses.</p>
        
        <blockquote class="border-l-4 border-green-500 pl-4 italic text-gray-700 my-6">
          "Technology has transformed how we farm. We can now predict weather patterns, monitor our crops remotely, and access markets directly." - Local Farmer
        </blockquote>
        
        <h3>Sustainable Future</h3>
        <p>AgriTech startups are also focusing on sustainability, developing solutions that promote climate-smart agriculture and help farmers adapt to changing environmental conditions.</p>
      `
    }
  ];

  useEffect(() => {
    const foundBlog = blogData.find(b => b.id === parseInt(id));
    setBlog(foundBlog);
    
    // Get related blogs (excluding current)
    const related = blogData.filter(b => b.id !== parseInt(id)).slice(0, 3);
    setRelatedBlogs(related);
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <Link to="/blog1" className="text-green-600 hover:text-green-700">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar theme="light" />
      
      {/* Hero Section */}
      <div className="pt-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-4">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center space-x-6 text-gray-200">
            <span>By {blog.author}</span>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg shadow-2xl"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      {/* Social Sharing */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Share this article</h3>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Share on Facebook
          </button>
          <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition">
            Share on Twitter
          </button>
          <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
            Share on LinkedIn
          </button>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((relatedBlog) => (
              <Link 
                key={relatedBlog.id} 
                to={`/blog/${relatedBlog.id}`}
                className="group block"
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden group-hover:shadow-xl transition-shadow">
                  <img 
                    src={relatedBlog.image} 
                    alt={relatedBlog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {relatedBlog.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{relatedBlog.date}</span>
                      <span>{relatedBlog.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog */}
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <Link 
          to="/blog1" 
          className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          <span>←</span>
          <span>Back to All Articles</span>
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
