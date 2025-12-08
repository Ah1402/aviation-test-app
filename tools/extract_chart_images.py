"""
Extract chart images from aviation test PDF
Requires: pip install pdf2image pillow PyPDF2
"""
import os
import sys
from pathlib import Path

try:
    from pdf2image import convert_from_path
    from PIL import Image
except ImportError:
    print("Missing dependencies. Install with:")
    print("  pip install pdf2image pillow")
    print("\nYou may also need poppler:")
    print("  Windows: https://blog.alivate.com.au/poppler-windows/")
    print("  Mac: brew install poppler")
    print("  Linux: apt-get install poppler-utils")
    sys.exit(1)

def extract_all_pages(pdf_path, output_dir, dpi=150):
    """Extract all pages as images"""
    print(f"Extracting pages from {pdf_path}")
    print(f"DPI: {dpi} (higher = better quality, slower)")
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    try:
        # Convert PDF to images
        print("Converting PDF pages to images...")
        pages = convert_from_path(pdf_path, dpi=dpi)
        
        print(f"Found {len(pages)} pages")
        
        for i, page in enumerate(pages, 1):
            output_file = output_path / f"page_{i:03d}.png"
            page.save(output_file, 'PNG', optimize=True)
            if i % 50 == 0:
                print(f"Processed {i}/{len(pages)} pages...")
        
        print(f"\nExtracted {len(pages)} pages to {output_dir}")
        print("\nNext steps:")
        print("1. Review extracted images")
        print("2. Identify pages with charts")
        print("3. Rename chart images (e.g., page_045.png → figure_4_1.png)")
        print("4. Move to appropriate folders (cap697/, jeppesen/, ed6/)")
        print("5. Run: node tools/link_charts_to_dataset.js")
        
    except Exception as e:
        print(f"Error: {e}")
        print("\nTroubleshooting:")
        print("- Ensure poppler is installed and in PATH")
        print("- Try reducing DPI (e.g., --dpi 100)")
        print("- Check PDF file path is correct")
        sys.exit(1)

def extract_page_range(pdf_path, output_dir, start_page, end_page, dpi=150):
    """Extract specific page range"""
    print(f"Extracting pages {start_page}-{end_page} from {pdf_path}")
    
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    pages = convert_from_path(
        pdf_path, 
        dpi=dpi,
        first_page=start_page,
        last_page=end_page
    )
    
    for i, page in enumerate(pages, start_page):
        output_file = output_path / f"page_{i:03d}.png"
        page.save(output_file, 'PNG', optimize=True)
    
    print(f"Extracted {len(pages)} pages to {output_dir}")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(
        description='Extract chart images from aviation test PDF'
    )
    parser.add_argument(
        'pdf_path',
        nargs='?',
        default=r'C:\Users\ahmed\Desktop\Full_compressed_250919_160111 (2).pdf',
        help='Path to PDF file'
    )
    parser.add_argument(
        '--output', '-o',
        default=r'src\charts\extracted',
        help='Output directory for images'
    )
    parser.add_argument(
        '--dpi',
        type=int,
        default=150,
        help='Image resolution (default: 150, higher = better quality)'
    )
    parser.add_argument(
        '--start',
        type=int,
        help='First page to extract (for range extraction)'
    )
    parser.add_argument(
        '--end',
        type=int,
        help='Last page to extract (for range extraction)'
    )
    
    args = parser.parse_args()
    
    if not os.path.exists(args.pdf_path):
        print(f"Error: PDF not found: {args.pdf_path}")
        sys.exit(1)
    
    if args.start and args.end:
        extract_page_range(args.pdf_path, args.output, args.start, args.end, args.dpi)
    else:
        extract_all_pages(args.pdf_path, args.output, args.dpi)

if __name__ == '__main__':
    main()
