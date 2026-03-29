import Link from 'next/link'
import { Phone, Smartphone, Mail, Clock, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="main-footer" className="footer">
      <div className="footer-gradient-border" />
      
      <div className="footer-grid">
        {/* Column 1 */}
        <div>
          <div className="flex flex-col gap-1 mb-8">
            <h2 style={{ fontFamily: 'Satoshi, sans-serif', fontWeight: 900, fontSize: '22px', color: 'white', lineHeight: 1 }}>
              SIGMA
            </h2>
            <div style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sigma-neutral-400)', lineHeight: 1 }}>
              OILFIELD
            </div>
            <div style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
              & Industrial Supply DMCC
            </div>
          </div>

          <div style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p>
              Jebel Ali, Dubai DMCC<br />
              JLT Platinum Tower, UAE
            </p>
            <p>
              Hyderabad MSME Hub<br />
              Telangana, India
            </p>
          </div>

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>GST: 36ABFPT4227QIZ0</span>
            <span>MSME: UDYAM-TS-02-0021894</span>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="footer-col-title">DIRECT CONTACTS</h3>
          
          <div className="footer-contact-row">
            <div className="footer-contact-icon">
              <Phone size={14} color="var(--sigma-red-500)" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: 'white', lineHeight: 1 }}>+971 4 266 5748</span>
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Dubai Office</span>
            </div>
          </div>

          <div className="footer-contact-row">
            <div className="footer-contact-icon">
              <Smartphone size={14} color="var(--sigma-red-500)" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: 'white', lineHeight: 1 }}>+971 50 258 0299</span>
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Mobile</span>
            </div>
          </div>

          <div className="footer-contact-row">
            <div className="footer-contact-icon">
              <Mail size={14} color="var(--sigma-red-500)" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: 'white', lineHeight: 1 }}>uma@sigmadxb.com</span>
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Procurement Lead</span>
            </div>
          </div>

          <div className="footer-contact-row">
            <div className="footer-contact-icon">
              <Mail size={14} color="var(--sigma-red-500)" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 500, fontSize: '14px', color: 'white', lineHeight: 1 }}>support@sigmadxb.com</span>
              <span style={{ fontFamily: 'General Sans, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>Technical Support</span>
            </div>
          </div>

          <div className="footer-response-indicator mt-6">
            <Clock size={12} />
            <span>Average response: &lt; 2 hours</span>
            <div className="footer-response-dot ml-2" />
          </div>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="footer-col-title">NAVIGATION</h3>
          <div className="mb-8">
            <Link href="/" className="footer-nav-link">Home</Link>
            <Link href="/products" className="footer-nav-link">Products</Link>
            <Link href="/clients" className="footer-nav-link">Clients</Link>
            <Link href="/about" className="footer-nav-link">About</Link>
            <Link href="/contact" className="footer-nav-link">Contact</Link>
          </div>

          <h3 className="footer-col-title">FOLLOW US</h3>
          <div className="footer-social-row">
            <a href="#" className="footer-social-btn" aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className="footer-social-btn" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
            <a href="#" className="footer-social-btn" aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className="footer-social-btn" aria-label="Instagram">
              <Instagram size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="flex flex-wrap gap-2">
          <span className="cert-badge">API Certified</span>
          <span className="cert-badge">ISO 9001:2015</span>
          <span className="cert-badge">DMCC Member</span>
        </div>
        <div style={{ fontFamily: 'General Sans, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          &copy; 2026 Sigma Oilfield & Industrial Supply DMCC
        </div>
      </div>
    </footer>
  )
}
