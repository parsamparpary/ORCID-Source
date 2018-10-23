package org.orcid.core.web.filters;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;

/**
 * Extends ServletOutputStream for JsonpCallbackFilter 
 * 
 * @author Robert Peters (rcpeters)
 *
 */
public class FilterServletOutputStream extends ServletOutputStream {

    private DataOutputStream stream;

    public FilterServletOutputStream(OutputStream output) {
        stream = new DataOutputStream(output);
    }

    @Override
    public void write(int b) throws IOException {
        stream.write(b);
    }

    @Override
    public void write(byte[] b) throws IOException {
        stream.write(b);
    }

    @Override
    public void write(byte[] b, int off, int len) throws IOException {
        stream.write(b, off, len);
    }

    @Override
    public boolean isReady() {
        return true;
    }

    @Override
    public void setWriteListener(WriteListener writeListener) {
        // It looks we dont have nothing do to here
    }

}