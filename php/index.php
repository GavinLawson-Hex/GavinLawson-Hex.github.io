<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Directory Lister</title>
    <style>
        body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 2rem; 
            background-color: #f3f4f6; 
            color: #1f2937; 
        }
        .container { 
            background: white; 
            padding: 2rem; 
            border-radius: 12px; 
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); 
            max-width: 600px; 
            margin: 0 auto; 
        }
        h1 { 
            font-size: 1.5rem; 
            margin-top: 0; 
            padding-bottom: 1rem;
            border-bottom: 2px solid #e5e7eb;
        }
        ul { 
            list-style-type: none; 
            padding: 0; 
            margin: 0;
        }
        li { 
            border-bottom: 1px solid #f3f4f6; 
        }
        li:last-child { 
            border-bottom: none; 
        }
        .item-link {
            display: flex; 
            align-items: center; 
            padding: 0.75rem 0.5rem;
            margin: 0 -0.5rem;
            text-decoration: none;
            border-radius: 8px;
            transition: background-color 0.2s ease;
        }
        .item-link:hover {
            background-color: #f0fdf4; /* subtle green hover */
        }
        .item-link:hover .dir,
        .item-link:hover .file {
            text-decoration: underline;
        }
        .icon {
            margin-right: 12px;
            font-size: 1.2rem;
        }
        .dir { 
            color: #2563eb; 
            font-weight: 600; 
        }
        .file { 
            color: #4b5563; 
        }
        .size {
            margin-left: auto;
            font-size: 0.85rem;
            color: #9ca3af;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Directory Contents</h1>
        <ul>
            <?php
            // Define the directory to scan ('.' means current directory)
            $directory = '.';

            // scandir() reads the contents of the directory into an array
            $files = scandir($directory);

            // Check if the directory was read successfully
            if ($files !== false) {
                foreach ($files as $file) {
                    // Skip the current ('.') and parent ('..') directory pointers
                    if ($file === '.' || $file === '..') {
                        continue;
                    }

                    $filePath = $directory . '/' . $file;
                    
                    // Encode the URL for links and escape HTML for safe display
                    $encodedUrl = rawurlencode($file);
                    $displayFile = htmlspecialchars($file);

                    // Check if the current item is a directory or a file
                    if (is_dir($filePath)) {
                        // Display as a clickable folder
                        echo "<li>";
                        echo "<a href='$encodedUrl/' class='item-link'>";
                        echo "<span class='icon'>📁</span>";
                        echo "<span class='dir'>$displayFile</span>";
                        echo "</a>";
                        echo "</li>";
                    } else {
                        // Get file size in KB and display as a clickable file
                        $fileSize = round(filesize($filePath) / 1024, 2) . ' KB';
                        
                        echo "<li>";
                        echo "<a href='$encodedUrl' class='item-link'>";
                        echo "<span class='icon'>📄</span>";
                        echo "<span class='file'>$displayFile</span>";
                        echo "<span class='size'>$fileSize</span>";
                        echo "</a>";
                        echo "</li>";
                    }
                }
            } else {
                echo "<li>Error reading directory. Please check permissions.</li>";
            }
            ?>
        </ul>
    </div>
</body>
</html>